import jamesWebb from '../assets/Projects/james_webb.jpg'
import kmeansVisualizer from '../assets/Projects/KMeans_Visualizer.jpg'
import mlrRegression from '../assets/Projects/MLR_regression.png'
import perceptron from '../assets/Projects/perceptron.png'
import semanticBook from '../assets/Projects/semantic_book_recommender.png'
import youtubeSentiment from '../assets/Projects/youtube_sentiment_analyzer.png'

export const projects = [
  {
    slug: 'semantic-book-recommender',
    title: 'Semantic Book Recommender',
    client: 'Machine Learning',
    year: '2025',
    image: semanticBook,
    summary: 'An interactive recommendation system that maps books by meaning, mood, and reader intent.',
    url: 'https://github.com/Sidhant-1299/Semantic-Book-Recommender',
    role: 'Recommendation systems, interface design, model evaluation',
    skillIds: ['python', 'nlp', 'embeddings', 'gradio'],
    thesis: 'Built to make discovery feel less like keyword search and more like matching a reader with the emotional shape of a book.',
    sections: [
      {
        heading: 'Signal over search',
        body: 'The project centers recommendations around semantic similarity and reader intent instead of relying only on exact genres or titles.',
      },
      {
        heading: 'Interface as explanation',
        body: 'The dashboard keeps the model visible enough to build trust while keeping the reading experience clear and lightweight.',
      },
    ],
  },
  {
    slug: 'youtube-sentiment-analyzer',
    title: 'YouTube Sentiment Analyzer',
    client: 'Browser Extension',
    year: '2025',
    image: youtubeSentiment,
    summary: 'A comment analysis tool for reading viewer sentiment directly inside the YouTube workflow.',
    url: 'https://github.com/Sidhant-1299/Youtube-Sentiment-Analysis',
    role: 'Extension workflow, sentiment analysis, product framing',
    skillIds: ['javascript', 'chrome-extension', 'nlp', 'apis'],
    thesis: 'A fast read on audience tone without leaving the video context or manually scanning long comment threads.',
    sections: [
      {
        heading: 'Context first',
        body: 'The extension keeps analysis close to the place where creators and viewers already read feedback.',
      },
      {
        heading: 'Readable output',
        body: 'The interface prioritizes quick sentiment direction and practical summaries over dense model output.',
      },
    ],
  },
  {
    slug: 'mlr-cpp',
    title: 'MLR C++',
    client: 'Numerical Systems',
    year: '2024',
    image: mlrRegression,
    summary: 'A fast multiple linear regression library with a Python-facing API and C++ core.',
    url: 'https://github.com/Sidhant-1299/mlr_cpp',
    role: 'Numerical implementation, API design, testing',
    skillIds: ['cpp', 'python', 'linear-algebra', 'regression'],
    thesis: 'A compact systems project focused on speed, predictable behavior, and a small interface for statistical modeling.',
    sections: [
      {
        heading: 'Small surface area',
        body: 'The library keeps the public API focused so the implementation can stay understandable and testable.',
      },
      {
        heading: 'Performance-minded core',
        body: 'C++ handles the numerical work while Python access keeps experimentation approachable.',
      },
    ],
  },
  {
    slug: 'exoplanet-exploration',
    title: 'Exoplanet Exploration EDA',
    client: 'Astronomy Data',
    year: '2024',
    image: jamesWebb,
    summary: 'Exploratory analysis of discovered exoplanets to surface patterns across orbital and physical properties.',
    url: 'https://github.com/Sidhant-1299/Exoplanet-Exploration',
    role: 'Exploratory analysis, data storytelling, visualization',
    skillIds: ['python', 'pandas', 'visualization', 'eda'],
    thesis: 'An astronomy dataset treated as a structured field study: clean the signal, compare properties, and surface meaningful patterns.',
    sections: [
      {
        heading: 'Mapping discovery',
        body: 'The analysis compares orbital and physical features to understand how discovered planets cluster and differ.',
      },
      {
        heading: 'Visual pacing',
        body: 'Charts are used as checkpoints in the investigation rather than decoration, making the exploration easier to follow.',
      },
    ],
  },
  {
    slug: 'kmeans-visualizer',
    title: 'Interactive K-Means Visualizer',
    client: 'Learning Tool',
    year: '2024',
    image: kmeansVisualizer,
    summary: 'A visual interface for learning how clustering changes as centroids move and assignments update.',
    url: 'https://github.com/Sidhant-1299/Kmeans_interactive_visualizer',
    role: 'Learning interface, clustering visualization, interaction design',
    skillIds: ['python', 'kmeans', 'visualization', 'interactive-ui'],
    thesis: 'A teaching tool that makes an iterative algorithm visible by showing how assignments and centroids evolve.',
    sections: [
      {
        heading: 'Make the algorithm move',
        body: 'The experience turns K-Means into a visual loop so learners can see each update instead of only reading equations.',
      },
      {
        heading: 'Controlled complexity',
        body: 'The UI keeps the number of controls low so the relationship between points, clusters, and centroids stays clear.',
      },
    ],
  },
  {
    slug: 'perceptron-study',
    title: 'Perceptron Study',
    client: 'ML Foundations',
    year: '2024',
    image: perceptron,
    summary: 'A compact study of the perceptron learning rule and decision boundary behavior.',
    role: 'ML foundations, visualization, model behavior study',
    skillIds: ['python', 'perceptron', 'classification', 'visualization'],
    thesis: 'A focused foundation study that makes the decision boundary and update rule easier to reason about.',
    sections: [
      {
        heading: 'Learning rule as behavior',
        body: 'The project focuses on how simple updates change the classifier over time and where the model succeeds or fails.',
      },
      {
        heading: 'Foundation before scale',
        body: 'Studying the perceptron keeps the mechanics visible before adding deeper model complexity.',
      },
    ],
  },
]
