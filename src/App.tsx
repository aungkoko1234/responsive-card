import { useEffect, useState } from "react";
import { Place, Tag } from "./types";
import { Chip } from "./Chip";

function App() {
  const [places, setPlaces] = useState<Place[] | undefined>(undefined);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw response.statusText;
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const tagData: Tag[] = await fetchData(
        "https://gist.githubusercontent.com/knot-freshket/fa49e0a5c6100d50db781f28486324d2/raw/55bc966f54423dc73384b860a305e1b67e0bfd7d/freshket-tags.json"
      );
      const placeData: Place[] = await fetchData(
        "https://gist.githubusercontent.com/knot-freshket/142c21c3e8e54ef36e33f5dc6cf54077/raw/94ebab16839484f06d42eb799e30d0a945ff1a1b/freshket-places.json"
      );

      const places = placeData.map(({ tags, ...place }) => {
        const relatedTags = tagData.filter((tag) => tags.includes(tag.id));
        return {
          ...place,
          tags,
          tagData: relatedTags,
        };
      });

      setPlaces(places);
    };
    fetchPlaces();
  }, []);

  return (
    <div className="container">
      {!places && <p>Loading ...</p>}
      {places &&
        places.map((place) => (
          <div className="card" key={place.id}>
            <img src={place.img_url} alt="image-url" />
            <div className="card-title">{place.name}</div>
            <p>{place.body}</p>
            <div className="chip-group">
              {place.tagData?.map((tag) => (
                <Chip key={tag.id} tag={tag.name} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
