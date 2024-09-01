import ProductCard from "@/app/(frontend)/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

const AccountSavelists = () => {
  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12 bg-gray-300 dark:bg-gray-700 p-5 rounded-xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            List of Favorite products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((_, i) => i < 6).map((stay) => (
            <ProductCard key={stay.id} data={stay} />
          ))}
        </div>
        <div className="flex !mt-20 justify-center items-center">
          <ButtonSecondary loading>Show me more</ButtonSecondary>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
