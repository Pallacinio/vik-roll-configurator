function CartSummary({ quantity, setQuantity, handleAddToCart, price }) {
    return (
      <div>
        <div className="flex flex-col gap-5 md:flex-row items-center justify-between">
          <div className="text-xl font-bold text-[#544e4a] bg-[#e9e9e9] pl-9 py-4 rounded-[50px]">
            SUMA:{" "}
            <span className="mr-0 px-10 md:px-20 py-4 rounded-[50px] text-[#544e4a] bg-white border-[#544e4a] border-2">
              {quantity * price.toFixed(2)} zł
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-[#e9e9e9] border-[#544e4a] border-2 rounded-lg text-xl"
            >
              -
            </button>
            <span className="text-xl text-[#544e4a] bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-[#e9e9e9] border-[#544e4a] border-2 rounded-lg text-xl"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-6 w-auto m-auto block md:ml-0 px-5 md:px-20 py-4 bg-[#544e4a] text-white rounded-[50px] text-xl font-semibold"
        >
          DODAJ DO KOSZYKA
        </button>
      </div>
    );
  }

export default CartSummary;