import { createComponent, RECEIVE_PROPS } from "melody-component";
import { bindEvents } from "melody-hoc";
import template from "./index.twig";

const enhance = bindEvents({
  addPointForm: {
    submit(event, component) {
      component.props.addPoint(component.el[0].value || "no name");

      event.preventDefault();
      event.stopPropagation();
    }
  }
});

export default enhance(createComponent(template));
