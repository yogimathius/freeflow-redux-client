import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactTags from 'react-tag-autocomplete'
import { selectAllskills } from '../../reducers/dbSkillsSlice'

function Tags (props) {
  const skills = useSelector(selectAllskills)
  const [skillsSet, setTags] = useState(skills)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    setSuggestions(props.suggested)
  }, [props.suggested])

  const reactTags = useRef(null)

  const onDelete = (i) => {
    const skill = skillsSet.slice(0)
    skill.splice(i, 1)

    setTags(skill)
  }

  const onAddition = (skill) => {
    setTags([...skillsSet, skill])
  }

  return (
    <ReactTags
      ref={reactTags}
      skills={skillsSet}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      onChange={props.onChange(skills)}
    />
  )
}

export default Tags
// ReactDOM.render(<App />, document.getElementById("app"));
