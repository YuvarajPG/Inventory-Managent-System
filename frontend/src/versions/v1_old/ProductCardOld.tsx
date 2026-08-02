import { ProductType } from "../../types/Product";
import Button from "../../components/ui/Button";

interface Props {
  product: ProductType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductCardOld = ({ product, onEdit, onDelete }: Props) => {
  return (
    <div className="gap-2 flex flex-col bg-slate-400 p-4 rounded-lg min-w-45 max-w-fit items-center hover:cursor-pointer">
      <li className="font-bold">{product.name}</li>
      <li className="font-semibold">Brand: {product.brand}</li>
      <li>Price: ${product.price}</li>
      <li>Stock: {product.stock}</li>
      <li>Ram: {product.details?.ram}</li>
      <li>Rom: {product.details?.rom}</li>

      <Button color="green" text="Edit" onClick={() => onEdit(product.id)} />
      <Button color="red" text="Delete" onClick={() => onDelete(product.id)} />
    </div>
  );
};

export default ProductCardOld;
