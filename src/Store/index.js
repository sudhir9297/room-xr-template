import { create } from "zustand";

export const useModelStore = create((set) => ({
  dynamicObjects: [],
  staticObjects: [],
  addDynamicObject: (dynamicObject) =>
    set((state) => ({
      dynamicObjects: [...state.dynamicObjects, dynamicObject],
    })),
  addStaticObject: (staticObject) =>
    set((state) => ({ staticObjects: [...state.staticObjects, staticObject] })),
}));
