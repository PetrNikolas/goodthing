import React, { Fragment } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
// import { Icon } from 'react-icons-kit';
// import { chevronRight } from 'react-icons-kit/feather/chevronRight';
import Image from 'gatsby-image';
import Text from 'reusecore/src/elements/Text';
import Heading from 'reusecore/src/elements/Heading';
import GlideCarousel from 'common/src/components/GlideCarousel';
import GlideSlide from 'common/src/components/GlideCarousel/glideSlide';
import LeftBar from './leftBar';
import BannerWrapper, {
  ContentWrapper,
  TextArea,
  ImageArea,
  // HighlightedText,
} from './bannerSection.style';

const BannerSection = () => {
  const glideOptions = {
    type: 'carousel',
    perView: 1,
    gap: 0,
  };

  const data = useStaticQuery(graphql`
    query {
      charityJson {
        bannerSlides {
          id
          thumb_url {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <BannerWrapper>
      <LeftBar text="POTÁHNI DOLU" offset={81} sectionId="#feature" />
      <ContentWrapper>
        <TextArea>
          {/*<HighlightedText className="highlighted_text">
            <strong>NEWS</strong> 1 year. 100 Forever Families.
            <Icon icon={chevronRight} />
          </HighlightedText>*/}
          <Heading
            content="Chceš přispět ale nevíš kam? Nebo komu?"
          />
          <Heading
            as="h4"
            content="Zde najdeš na jednom místě všechny neziskové organizace a charity, kterým můžeš přispět na dobrou věc."
          />
          <Text
            content="Tento projekt vznikl jako místo, kde se shromažďují všechny neziskové organizace a charity kam může člověk přispět a pomoci tak někomu v těžké situaci, na záchranu zvířat, na rekonstrukci památek, atd..."
          />
          {/*<Link className="learn__more-btn" to="/">
            <span className="hyphen" />
            <span className="btn_text">Chci vědět víc</span>
          </Link>*/}
        </TextArea>
        <ImageArea>
          <GlideCarousel
            carouselSelector="charitySlide"
            options={glideOptions}
            nextButton={<span className="next_arrow" />}
            prevButton={<span className="prev_arrow" />}
          >
            <Fragment>
              {data.charityJson.bannerSlides.map(slide => (
                <GlideSlide key={slide.id}>
                  <Image
                    fluid={
                      (slide.thumb_url !== null) | undefined
                        ? slide.thumb_url.childImageSharp.fluid
                        : {}
                    }
                    alt={`Charity slide image ${slide.id}`}
                    className="slide_image"
                  />
                </GlideSlide>
              ))}
            </Fragment>
          </GlideCarousel>
        </ImageArea>
      </ContentWrapper>
    </BannerWrapper>
  );
};

export default BannerSection;
