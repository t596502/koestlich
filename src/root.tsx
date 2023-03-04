import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Bucket } from "./bucket.js";
import { UseComponent } from "./component.js";
import { BaseNode, NodeClass, useNode } from "./node.js";
import { useFrame } from "@react-three/fiber";
import { PropertiesFromAPI, PropertyAPI, translateProperties } from "./properties/index.js";
import { YogaProperties } from "@coconut-xr/flex";
import { Yoga } from "yoga-wasm-web";
import { suspend } from "suspend-react";

const BaseNodeContext = createContext<BaseNode>(null as any);

export const BaseNodeContextProvider = BaseNodeContext.Provider;

export function useBaseNodeContext(): BaseNode {
  const context = useContext(BaseNodeContext);
  if (context == null) {
    throw `unable to find flex context. Missing a BaseNodeContextProvider.`;
  }
  return context;
}

export type RootStorage = {
  yoga: Yoga;
  requestLayoutCalculation: () => void;
  precision: number;
  nodeMap: Map<string, BaseNode>;
  bucket: Bucket;
};

const storageContext = createContext<RootStorage>(null as any);
const defaultStyleContext = createContext<any>(null as any);

export function DefaultStyleProvider<A extends PropertyAPI>({
  children,
  ...props
}: PropsWithChildren<PropertiesFromAPI<{ [Key in string]?: any }, A>>) {
  return <defaultStyleContext.Provider value={props}>{children}</defaultStyleContext.Provider>;
}

export const useDefaultStyles = useContext.bind(null, defaultStyleContext);

export const useRootStorage = () => useContext(storageContext);

const LoadYogaSymbol = Symbol("loadYoga");

export function buildRoot<T extends BaseNode, P extends YogaProperties, C, A extends PropertyAPI>(
  nodeClass: NodeClass<T>,
  useComponent: UseComponent<T, P, C>,
  api: A,
) {
  // eslint-disable-next-line react/display-name
  return forwardRef<
    T | undefined,
    P &
      PropertiesFromAPI<P, A> & {
        precision?: number;
        id?: string;
        children?: C;
        classes?: Array<Partial<PropertiesFromAPI<P, A>>>;
        loadYoga: () => Promise<Yoga>;
      }
  >(({ loadYoga, precision, id = "root", children, classes, ...props }, ref) => {
    const yoga = suspend(loadYoga, [loadYoga, LoadYogaSymbol]);
    const dirtyRef = useRef(false);
    const rootStorage = useMemo<RootStorage>(
      () => ({
        yoga,
        nodeMap: new Map(),
        bucket: new Bucket(),
        precision: precision ?? 0.001,
        requestLayoutCalculation: () => (dirtyRef.current = true),
      }),
      [precision, yoga],
    );
    const defaultProperties = useDefaultStyles();
    const properties = translateProperties(
      api,
      props as unknown as P,
      defaultProperties ?? {},
      ...(classes ?? []),
    );
    const node = useNode(rootStorage, undefined, undefined, id, nodeClass, ref);
    const reactChildren = useComponent(node, properties, children);
    useFrame((state, deltaTime) => {
      if (dirtyRef.current) {
        node.calculateLayout();
        dirtyRef.current = false;
      }
      node.update(deltaTime);
    });

    useEffect(() => {
      if (node.setParent(undefined)) {
        rootStorage.requestLayoutCalculation();
      }
    });

    return (
      <>
        <storageContext.Provider value={rootStorage}>
          {<BaseNodeContextProvider value={node}>{reactChildren}</BaseNodeContextProvider>}
        </storageContext.Provider>
        {
          <group {...emptyHandlers}>
            {
              // eslint-disable-next-line react/no-unknown-property
              <primitive object={rootStorage.bucket} />
            }
          </group>
        }
      </>
    );
  });
}

const emptyHandlers = {
  onClick: empty,
  onContextMenu: empty,
  onDoubleClick: empty,
  onPointerLeave: empty,
  onPointerUp: empty,
  onPointerOver: empty,
  onPointerEnter: empty,
  onPointerDown: empty,
  onPointerCancel: empty,
  onPointerOut: empty,
};

function empty() {
  //
}
