function ProductPreview({ selectedColor, selectedListwa, selectedMocowanie, mountingType }) {
    return (
      <div className="relative flex-1 flex items-start justify-center min-h-[400px] md:min-h-[600px]">
        {/* <img
          src={selectedColor?.imageLink}
          alt="Product Preview"
          className="absolute rounded-lg shadow-lg max-h-[400px] md:max-h-[600px] object-contain"
        /> */}
        <img
          src={
            mountingType === "nonInvasive"
              ? selectedColor?.imageLinkSecond
              : selectedColor?.imageLink
          }
          alt="Product Preview"
          className="absolute rounded-lg shadow-lg max-h-[400px] md:max-h-[600px] object-contain"
        />
        {selectedListwa && (
          <img
            src={
              mountingType === "invasive"
                ? selectedListwa.imageLinkInvasive
                : selectedListwa.imageLinkNonInvasive
            }
            alt={`Podgląd listwy ${selectedListwa.name}`}
            className="absolute rounded-lg max-h-[400px] md:max-h-[600px] object-contain"
          />
        )}
        {selectedMocowanie && (
          <img
            src={selectedMocowanie.imageLink}
            alt="Podgląd mocowania"
            className="absolute rounded-lg max-h-[400px] md:max-h-[600px] object-contain"
          />
        )}
      </div>
    );
}
export default ProductPreview;