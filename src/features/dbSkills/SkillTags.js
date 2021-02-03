import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTags from "react-tag-autocomplete";
import { selectAllskills } from "./dbSkillsSlice";

function Tags(props) {
	// console.log("skills", props.suggested);
	const skills = useSelector(selectAllskills)
	// console.log("skills in skill tags: ", skills);
	const [skillsSet, setTags] = useState(skills);
	// console.log('skillset: ', skillsSet);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(props.suggested);
  }, [props.suggested]);

  const reactTags = useRef(null);

  const onDelete = (i) => {
    let skill = skillsSet.slice(0);
    skill.splice(i, 1);

    setTags(skill);
  };

  const onAddition = (skill) => {
    setTags([...skillsSet, skill]);
    // console.log("skills", skills);
  };

  return (
    <ReactTags
      ref={reactTags}
      skills={skillsSet}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      onChange={props.onChange(skills)}
    />
  );
}

export default Tags;
// ReactDOM.render(<App />, document.getElementById("app"));
