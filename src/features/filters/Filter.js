import { useSelector, useDispatch } from 'react-redux';
import { VisibilityFilters, addVisibilityFilter } from './filtersSlice';
import FilterLink from './FilterLink.js'
import React, { useEffect } from 'react';

const Filter = () => {
  const dispatch = useDispatch()
  const stateSkills = useSelector(state => state.skills.entities)
  useEffect (() => {
    for (const skill in stateSkills) {
    if (Object.hasOwnProperty.call(stateSkills, skill)) {
      const skillElement = stateSkills[skill];
      dispatch(addVisibilityFilter(skillElement))
      }
    }
  })

  const filterKeys = Object.keys(VisibilityFilters)

  const renderedFilters = filterKeys ? filterKeys.map((filter, index) => {
    return (
      <FilterLink key={index} filter={VisibilityFilters[filter]}>
        {filter}
      </FilterLink>
    )
  }) : "";

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
