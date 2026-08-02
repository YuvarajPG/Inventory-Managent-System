import React from "react";
import { ProductType } from "../../types/Product";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  open: boolean;
  product: ProductType | null;
  setProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
  onSave: () => void;
  onClose: () => void;
}

const EditModal = ({ open, product, setProduct, onSave, onClose }: Props) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-3 min-w-96">
        <h2 className="text-xl font-bold">Edit Product</h2>

        <p className="font-semibold">{product.name}</p>

        <Input
          text="Price"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({
              ...product,
              price: Number(e.target.value),
            })
          }
        />

        <Input
          text="Stock"
          type="number"
          value={product.stock}
          onChange={(e) =>
            setProduct({
              ...product,
              stock: Number(e.target.value),
            })
          }
        />

        <Input
          text="RAM"
          value={product.details.ram}
          onChange={(e) =>
            setProduct({
              ...product,
              details: {
                ...product.details,
                ram: e.target.value,
              },
            })
          }
        />

        <Input
          text="ROM"
          value={product.details.rom}
          onChange={(e) =>
            setProduct({
              ...product,
              details: {
                ...product.details,
                rom: e.target.value,
              },
            })
          }
        />

        <div className="flex justify-center gap-3 mt-4">
          <Button color="blue" text="Save Changes" onClick={onSave} />

          <Button color="gray" text="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
