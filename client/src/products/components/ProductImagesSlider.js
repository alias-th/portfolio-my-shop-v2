import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import classes from "./ProductImagesSlider.module.css";

function ProductImagesSlider(props) {
  const responsive = {
    0: { items: 1 },
    524: { items: 2 },
    1024: { items: 3 },
  };

  if (props.items.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes["container__images-slider"]}>
      <AliceCarousel
        mouseTracking
        items={props.items}
        disableButtonsControls={true}
        controlsStrategy="alternate"
        responsive={responsive}
        autoPlayDirection="ltr"
        disableAutoPlayOnAction={true}
        infinite={true}
        paddingLeft={10}
        paddingRight={10}
      />
    </div>
  );
}

export default ProductImagesSlider;
