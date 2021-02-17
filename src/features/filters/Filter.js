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
      <div key={index}>

        <FilterLink key={index} filter={VisibilityFilters[filter]}>
          {filter}
        </FilterLink>
      </div>
    )
  }) : "";

  return (
    <div className="flex flex-col justify-center">
      <div className="text-xs font-extrabold mr-2 text-center">Filter by: </div>
      <div className="flex justify-center flex-wrap">
        {renderedFilters}
      </div>
    </div>
  )
}

export default Filter
