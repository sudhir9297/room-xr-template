import { create } from "zustand";

export const useModelStore = create((set) => ({
  dynamicObjects: [],
  staticObjects: [],
  selectedObject: {},
  currentVariation: null,

  addSelectedObject: (object) => set({ selectedObject: object }),
  removeSelectedObject: () =>
    set({ selectedObject: {}, currentVariation: null }),

  setCurrentVariation: (object) => set({ currentVariation: object }),

  addDynamicObject: (dynamicObject) =>
    set((state) => ({
      dynamicObjects: [...state.dynamicObjects, dynamicObject],
    })),
  addStaticObject: (staticObject) =>
    set((state) => ({ staticObjects: [...state.staticObjects, staticObject] })),
}));
