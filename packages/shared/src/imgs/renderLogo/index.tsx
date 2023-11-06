import { logo } from "../logo";

export interface RenderLogoProps {
  logoName: string;
  classNames?: {
    img?: string;
    text?: string;
  };
  styles?: {
    img?: React.CSSProperties;
    text?: React.CSSProperties;
  };
}

export default function RenderLogo(props: RenderLogoProps) {
  const { classNames, styles: _styles } = props;
  const logoName = props.logoName?.toLowerCase();
  if (logoName in logo) {
    const LogoSrc = logo[logoName as keyof typeof logo]?.[0];
    if (typeof LogoSrc === "string") {
      return (
        <img
          src={LogoSrc}
          alt={logoName}
          className={classNames?.img}
          style={_styles?.img}
        />
      );
    } else {
      return (
        <LogoSrc
          className={classNames?.img}
          style={{ width: "auto", ..._styles?.img }}
        />
      );
    }
  } else {
    return (
      <span className={classNames?.text} style={_styles?.text}>
        {logoName?.toUpperCase()}
      </span>
    );
  }
}
