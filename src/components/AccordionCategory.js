import MenuItem from "./MenuItem";

const AccordionCategory = ({ data, isActive, onClick }) => {
  const title = data?.title || "Untitled Category";
  const itemCards = data?.itemCards || data?.card?.card?.itemCards || [];

  return (
    <div className="border border-gray-300 rounded-md mb-4">
      <div
        onClick={onClick}
        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-2xl">{isActive ? "-" : "+"}</span>
      </div>

      {isActive && (
        <div className="p-4 bg-white">
          {itemCards.length > 0 ? (
            <ul className="list-disc pl-8">
              {itemCards.map((item, idx) =>
                item?.card?.info ? (
                  <MenuItem key={idx} menuInfo={item.card.info} />
                ) : (
                  <li key={idx} className="text-gray-500">
                    Invalid menu item
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No items available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionCategory;
