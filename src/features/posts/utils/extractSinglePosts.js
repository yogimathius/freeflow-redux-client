const extractSinglePosts = (posts, skills) => {
  const postKeys = Object.keys(posts.entities)
  const skillKeys = Object.keys(skills.entities)

  const postSkillsArr = []
  const postArr = []

  postKeys.forEach(postKey => {
    const singlePosts = JSON.parse(JSON.stringify(posts.entities[postKey]))

    singlePosts.skills = []
    skillKeys.forEach(skillKey => {
      postSkillsArr.push(skills.entities[skillKey])
      if (singlePosts.skill_ids.includes(skills.entities[skillKey].id)) {
        singlePosts.skills.push(skills.entities[skillKey].name)
      }
    })
    postArr.push(singlePosts)
  })

  return { postArr }
}

export { extractSinglePosts }
