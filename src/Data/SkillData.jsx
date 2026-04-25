export const skills = [
  { id: 'python', label: 'Python', group: 'Language' },
  { id: 'javascript', label: 'JavaScript', group: 'Language' },
  { id: 'cpp', label: 'C++', group: 'Language' },
  { id: 'nlp', label: 'NLP', group: 'Machine Learning' },
  { id: 'embeddings', label: 'Embeddings', group: 'Machine Learning' },
  { id: 'regression', label: 'Regression', group: 'Machine Learning' },
  { id: 'classification', label: 'Classification', group: 'Machine Learning' },
  { id: 'kmeans', label: 'K-Means', group: 'Machine Learning' },
  { id: 'perceptron', label: 'Perceptron', group: 'Machine Learning' },
  { id: 'linear-algebra', label: 'Linear Algebra', group: 'Math' },
  { id: 'pandas', label: 'Pandas', group: 'Data' },
  { id: 'eda', label: 'EDA', group: 'Data' },
  { id: 'visualization', label: 'Visualization', group: 'Data' },
  { id: 'streamlit', label: 'Streamlit', group: 'Interface' },
  { id: 'gradio', label: 'Gradio', group: 'Interface' },
  { id: 'chrome-extension', label: 'Chrome Extension', group: 'Interface' },
  { id: 'interactive-ui', label: 'Interactive UI', group: 'Interface' },
  { id: 'apis', label: 'APIs', group: 'Systems' },
  { id: 'sql', label: 'SQL', group: 'Systems'}
]

export const tools = ['Git', 'GitHub', 'Jupyter', 'Numpy', 'PyTorch', ]

const skillById = new Map(skills.map((skill) => [skill.id, skill]))

export function getSkillLabels(skillIds = []) {
  return skillIds
    .map((skillId) => skillById.get(skillId)?.label)
    .filter(Boolean)
}
