




const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-amber-500 stroke-amber-500" />
      )}
      
      {/* Empty stars */}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 stroke-amber-500" />
      ))}
      
      {/* Optional numeric rating */}
      <span className="text-sm font-medium text-gray-700 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
export default RatingStars