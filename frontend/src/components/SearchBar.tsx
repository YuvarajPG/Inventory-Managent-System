import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { searchProductsAPI } from "../../api/api";
import ProductType from "../types/Product";
import Input from "./ui/Input";
interface props {
  setProductList: Dispatch<SetStateAction<ProductType[]>>;
}
const SearchBar = ({ setProductList }: props) => {
  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = await searchProductsAPI(searchTerm);
    setProductList(filtered);
  };

  return (
    <div className="flex items-center flex-col my-3 gap-2">
      <hr className="border-t-2 border-gray-300 w-full mb-2" />
      <div className="flex justify-center items-center text-center">
        <Input
          text="search : "
          placeholder="search product"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
