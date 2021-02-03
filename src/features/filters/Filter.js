import { useSelector, useDispatch } from 'react-redux';
import { VisibilityFilters, addVisibilityFilter } from './filtersSlice';
import FilterLink from './FilterLink.js'
import React, { useEffect } from 'react';
import { selectAllskills } from '../dbSkills/dbSkillsSlice';

const Filter = () => {
  const dispatch = useDispatch()

  const skills = useSelector(selectAllskills)

  useEffect (() => {
    for (const skill in skills) {
    if (Object.hasOwnProperty.call(skills, skill)) {
      const skillElement = skills[skill];
      dispatch(addVisibilityFilter(skillElement))
      }
    }
  })


  const filterKeys = Object.keys(VisibilityFilters)
  const renderedFilters = filterKeys.map((filter, index) => {
    return (
      <FilterLink key={index} filter={VisibilityFilters[filter]}>
        {filter}
      </FilterLink>
    )
  })

  return (
    <div className="flex mt-3 items-center justify-center space-x-8">
      <span className="font-extrabold">Show: </span>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-x-5 text-xs">
        {renderedFilters}
      </div>
    </div>
  )
}

export default Filter
