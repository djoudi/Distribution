// TODO : use reselect
// TODO : there is possible code refactoring with editor/selectors.js

const empty = state => state.quiz.steps.length === 0
const quiz = state => state.quiz
const steps = state => state.steps
const id = state => state.quiz.id
const description = state => state.quiz.description
const parameters = state => state.quiz.parameters
const title = state => state.quiz.title
const meta = state => state.quiz.meta
const published = state => state.quiz.meta.published
const viewMode = state => state.viewMode

// TODO: update when data is available
const editable = () => true
const hasPapers = () => true

export default {
  id,
  quiz,
  steps,
  empty,
  editable,
  hasPapers,
  description,
  meta,
  parameters,
  title,
  published,
  viewMode
}