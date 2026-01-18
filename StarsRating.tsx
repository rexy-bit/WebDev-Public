

export default function StarsRating({ note } : {note : number}) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (note >= i) {
      stars.push(<i key={i} className="fas fa-star text-gray-900" />);
    } else if (note >= i - 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-shadow-blue-950" />);
    } else {
      stars.push(<i key={i} className="far fa-star text-shadow-blue-950" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}
