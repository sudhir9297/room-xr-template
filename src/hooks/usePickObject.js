import { useCallback } from "react";
import { useModelStore } from "@/Store";
import { ProductList } from "@/constant/data";

export const heldObjects = new Map();

export const usePickObject = () => {
  const { setSelectedObject } = useModelStore();

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();

    Object.entries(ProductList).forEach(([key, value]) => {
      if (key === e.object.name) {
        setSelectedObject({ name: key, data: value });
      }
    });
  });

  return { onPointerDown };
};
