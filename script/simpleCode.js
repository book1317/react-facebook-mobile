module.exports.getSimpleReact = JSFileName => {
  return `import React from "react";

export default class ${JSFileName} extends React.Component {
    render() {
        return (
            <div className="${JSFileName.toString().toLowerCase()}-container">
                  
            </div>
        );
    }
}
    `;
};

module.exports.getSimpleSCSS = JSFileName => {
  return `.${JSFileName.toString().toLowerCase()}-container{

}`;
};
