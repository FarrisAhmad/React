import { useState, useCallback, useEffect, useRef } from "react"; // https://reactjs.org/docs/hooks-intro.html
import ReactDOM from "react-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';

const numberOnly = (value, fallbackValue) =>
  isNaN(value) ? fallbackValue : value;
// function numberOnly(value, fallbackValue) {
//   if (isNaN(value)) {
//     return fallbackValue;
//   } else {
//     return value;
//   }
// }

function TwoButtons(props) {
  const { title } = props; // const title = props.title;
  const [firstValue, setFirstValue] = useState(""); // const stateAndSetter= useState(""); const firstValue = stateAndSetter[0], setFirstValue= stateAndSetter[1];
  const [secondValue, setSecondValue] = useState("");
  const [result, setResult] = useState("");
  const [disableOperations, setDisableOperations] = useState(true);

  const handleFirstValueChange = useCallback(
    (event) => {
      // function (event){
      setFirstValue((currentFirstValue) => {
        const nextFirstValue = event.target.value;
        return numberOnly(nextFirstValue, currentFirstValue);
      });
    },
    [] // no need to include dependency setFirstValue: setters do not mutate
  );

  const handleSecondValueChange = useCallback(
    (event) => {
      setSecondValue(event.target.value);
    },
    [] // no need to include dependency setSecondValue: setters do not mutate
  );

  const handleAddChange = useCallback(
    (event) => {
      event.preventDefault(); // prevents form submit action
      setResult(+firstValue + +secondValue); // setResult(parseFloat(firstValue) + parseFloat(secondValue))
    },
    [firstValue, secondValue, setResult]
  );

  const handleSubstractChange = useCallback(
    (event) => {
      event.preventDefault(); // prevents form submit action
      setResult(+firstValue - +secondValue);
    },
    [firstValue, secondValue, setResult]
  );

  const handleResetChange = useCallback(
    (event) => {
      event.preventDefault(); // prevents form submit action
      setFirstValue("");
      setSecondValue("");
      setResult("");
    },
    [] // no need to include dependencies setFirstValue, setSecondValue, or setResult: setters do not mutate
  );

  const focusedElementRef = useRef();
  let label_created = false;

  // Given a class string name, remove any element with that class name from the page
  function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
  // Insert a new node into the page after a given existing node
  function insertAfter(newNode, existingNode) {
    if (existingNode != null) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
  }
  // Add input element fields into the page
  function addInputs() {
    // Label creation
    if (!label_created) {
      insertAfter(document.createElement("br"), document.getElementById("M"));
      var labels = document.createElement("div");
      var label1 = document.createElement("h5");
      label1.innerHTML =
        "Names&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Characteristics";
      // label2 = document.createElement("h5");
      // label2.innerHTML = "";
      labels.appendChild(label1);
      // labels.appendChild(label2);
      insertAfter(labels, document.getElementById("M"));
      label_created = true;
    }
    removeElementsByClass("createdinput");
    var user_input_string = document.getElementById("L").value;
    var user_input = parseInt(user_input_string);
    console.log(user_input);
    const new_inputs = [];
    const new_names = [];
    const pairs = [];
    for (let i = 0; i < user_input; i += 1) {
      // Create input html element
      new_inputs[i] = document.createElement("input");
      // Set attributes to the created input html element
      new_inputs[i].setAttribute("type", "number");
      new_inputs[i].required = true;
      new_inputs[i].setAttribute("class", "createdinput");
      new_inputs[i].setAttribute("id", "created_input_" + i);
      new_inputs[i].setAttribute("name", "created_input");
      new_inputs[i].setAttribute("min", "1");
      new_names[i] = document.createElement("input");
      new_names[i].setAttribute("type", "text");
      new_names[i].required = false;

      new_names[i].setAttribute("class", "createdinput");
      new_names[i].setAttribute("id", "created_name_" + i);
      new_names[i].setAttribute("name", "created_name");

      new_inputs[i].setAttribute("min", "1");
      pairs[i] = document.createElement("div");
      pairs[i].appendChild(new_names[i]);
      pairs[i].appendChild(new_inputs[i]);
      pairs[i].appendChild(document.createElement("br"));
      // Add the html element for the DOM
      insertAfter(pairs[i], document.getElementById("N"));
      //document.body.appendChild(new_inputs[i]);
    }
  }
  useEffect(() => {
    // focusedElementRef.current.focus();
  }, []);

  useEffect(
    () => {
      let nextDisableOperations = false;
      if (isNaN(firstValue) || isNaN(secondValue)) {
        nextDisableOperations = true;
      }

      disableOperations !== nextDisableOperations &&
        setDisableOperations(nextDisableOperations);
    },
    [disableOperations, firstValue, secondValue] // need to include firstValue and secondValue: values do mutate
  );

  return (
    <div>
      <div class="hor-center">
        <h1>SWE 432</h1>
      </div>
      <div class="hor-center">
        <h2>Farris Ahmad, Joseph Chang, and Ben Dufore</h2>
      </div>
      <div class="hor-center">
        <div styles="width:90%;" />
        Please type in a positive number in the shown field to generate a number
        of desired inputs (positive number) for submission. In the generated
        inputs fields, please type in the desired query to send to the handler.
        <div styles="width:10%;" />
      </div>
      <br />
      <br />
      <form
        id="form"
        method="post"
        action="https://jchang32swe432tomcat.herokuapp.com/hw7"
      >
        Desired Inputs:{" "}
        <input
          required
          name="L"
          onChange={addInputs}
          id="L"
          type="number"
          min="1"
          styles="border: 1px solid blue;border-radius:2px;background-color:#edf4ff;height:1.5em;padding-left:0.5em;"
        />
        <br name="M" id="M" />
        <br name="N" id="N" />
        <select name="choice" id="choice">
          <option value="each">Each-Choice Testing</option>
          <option value="base">Base-Choice Testing</option>
          <option value="dosubmit">Submit Characteristics</option>
        </select>
        <input
          id="submit"
          type="submit"
          styles="color:white;background-color:#4CAF50;font-size:1em;padding:.5em .5em;text-align:center;cursor:pointer;"
        ></input>
        <br />
      </form>
      <p>
        HW7 Collaboration Summary:
        <br />
        This assignment was done by Farris Ahmad, Joseph Chang, and Ben Dufore.
        Since the assignment was straightforward, it was equally contributed to.
        We added the forward function on top of a new servlet forwarding to our
        hw4/hw6 code. Hosting was done on Joseph's heroku/Github.
      </p>
    </div>
  );
}

ReactDOM.render(
  <TwoButtons
    title={
      "A simple example that demonstrates how to operate with multiple submit buttons."
    }
  />,
  document.querySelector("#root")
);

// If you got here, please check the Material UI version of this example:
// https://codesandbox.io/s/swe-432-react-two-buttons-example-mui-yohyi
