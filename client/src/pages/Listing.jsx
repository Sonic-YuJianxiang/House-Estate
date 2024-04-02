import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "react-router-dom";
import "swiper/css/bundle";

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { listingId } = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/listing/get/${listingId}`);
                const data = await response.json();
                if (data.success === true) {
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
            
        };
    }, [listingId]);

    return (
        <main>
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && <p>Something went wrong</p>}
            {listing && !loading && !error && <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url)>(
                        <SwiperSlide key={url}>
                            <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>   
            </div>}
        </main>
    );
}