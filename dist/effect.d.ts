type Cleanup = () => void;
type GetFn = () => Cleanup;
export declare function effect(callback: GetFn): () => void;
export {};
//# sourceMappingURL=effect.d.ts.map