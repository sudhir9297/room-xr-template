import { create } from "zustand";

export const useModelStore = create((set) => ({
  dynamicObjects: [],
  staticObjects: [],

  selectedObjectName: null,
  selectedObjectData: {},
  currentTexture: null,

  setSelectedObject: ({ data, name }) =>
    set({
      selectedObjectData: data,
      selectedObjectName: name,
      currentTexture: null,
    }),

  clearSelectedObject: () =>
    set({
      selectedObjectName: null,
      currentTexture: null,
      selectedObjectData: {},
    }),

  setCurrentTexture: (object) => set({ currentTexture: object }),

  addDynamicObject: (dynamicObject) =>
    set((state) => ({
      dynamicObjects: [...state.dynamicObjects, dynamicObject],
    })),
  addStaticObject: (staticObject) =>
    set((state) => ({ staticObjects: [...state.staticObjects, staticObject] })),
}));
