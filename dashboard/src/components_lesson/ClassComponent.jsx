import React from "react";

class ClassComponent extends React.Component {
    render() {
        const text = 'Class component';

        return (
            <h1>{this.props.text}</h1>
        );
    };
};

export default ClassComponent;