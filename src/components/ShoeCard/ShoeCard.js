import React from "react";
import styled from "styled-components/macro";
import { keyframes } from "styled-components";

import { WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === "on-sale" && (
            <SaleFlag>
              <NewFlagText
                totalTime={0.5}
                speedFactor={1.5}
                animationPercent={0.8}
                jumpUpEnd={-1}
                jumpUpStart={-6}
                text="Sale"
              />
            </SaleFlag>
          )}
          {variant === "new-release" && (
            <NewFlag>
              <NewFlagText
                totalTime={0.75}
                animationPercent={0.25}
                speedFactor={0.45}
                jumpUpStart={-8}
                jumpUpEnd={-2}
                text="Just released!"
              />
            </NewFlag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color":
                variant === "on-sale" ? "var(--color-gray-700)" : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const NewFlagText = ({
  text,
  speedFactor = 0.5,
  totalTime = 0.8,
  animationPercent = 0.4,
  jumpUpEnd = -3,
  jumpUpStart = -12,
}) => {
  function animationDelay(position) {
    return (
      (position / text.length) * (totalTime - totalTime * animationPercent)
    );
  }

  function animationTime(position) {
    const baseTime = totalTime * animationPercent;
    const speedDivisor =
      speedFactor - ((speedFactor - 0.75) * (position + 1)) / text.length;
    console.log(
      `baseTime: ${baseTime}, speedDivisor: ${speedDivisor}, position: ${position}`
    );
    return baseTime / speedDivisor + "s";
  }

  function jumpUpAmount(position) {
    const startingPart = (jumpUpStart * (text.length - position)) / text.length;
    const endingPart = (jumpUpEnd * position) / text.length;
    return startingPart + endingPart;
  }

  return [...text].map((char, i) => (
    <FlagChar
      key={i}
      style={{
        "--animation-time": animationTime(i),
        "--animation-delay": 0.1 + animationDelay(i) + "s",
        "--jump-up-amount": jumpUpAmount(i) + "px",
      }}
    >
      {char}
    </FlagChar>
  ));
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;
`;

const Image = styled.img`
  width: 100%;

  will-change: transform;
  transition: transform 0.75s ease-in-out;
  display: block;
  transform-origin: 50% 80%;

  ${Link}:hover &, ${Link}:focus & {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

const bumpUpAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(var(--jump-up-amount));
  }

  100% {
    transform: translateY(0px);
  }`;

const FlagChar = styled.span`
  will-change: transform, color;
  display: inline-block;
  white-space: pre-wrap;

  ${Link}:hover &, ${Link}:focus & {
    animation: ${bumpUpAnimation} var(--animation-time) ease-in-out forwards;
    animation-delay: var(--animation-delay);
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
`;

const flagAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0px);
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
