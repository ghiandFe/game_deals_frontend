import React from "react";


function Button(props) {

  // Required props: text && (href || onClick)
  const {
    text, color=null, bgColor="primary", isOutline=false,
    onClick=null, href=false, shadowLight=false,
    isLarge=false, isSmall=false, type
  } = props;

  // Style
  const classes = `
    btn m-3 ${ onClick ? "upper" : "" }
    ${ isLarge ? "btn-lg" : "" }
    ${ isSmall ? "btn-sm" : "" }
    btn-${ isOutline ? "outline-" : "" }${ bgColor }
    ${ color ? `text-${color}` : "" }
    btn-shadow${ shadowLight ? "-light" : "" }
  `;

  return (
    <React.Fragment>
      {
        // HTML tag. href -> <a>, onClick -> <button>
        href
        ? <LinkButton className={ classes } href={ href }>
            { text }
          </LinkButton>
        : <BaseButton className={ classes } onClick={ onClick } type={ type }>
            { text }
          </BaseButton>
      }
    </React.Fragment>
  );
}


function BaseButton({ className, onClick, type="button", children }) {
  return (
    <button
      className = { className }
      type={type}
      onClick={ onClick }
    >
      { children }
    </button>
  );
}


function LinkButton({ className, href, children }) {
  return (
    <a
      className = { className }
      type="button"
      href={ href }
      target={ href.includes("cheapshark") ? "_blank" : "_self" }
      rel={ href.includes("cheapshark") ? "noreferrer" : undefined }
    >
      { children }
    </a>
  );
}


export default Button;