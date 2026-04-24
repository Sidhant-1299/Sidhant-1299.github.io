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
  },
  {
    slug: 'youtube-sentiment-analyzer',
    title: 'YouTube Sentiment Analyzer',
    client: 'Browser Extension',
    year: '2025',
    image: youtubeSentiment,
    summary: 'A comment analysis tool for reading viewer sentiment directly inside the YouTube workflow.',
    url: 'https://github.com/Sidhant-1299/Youtube-Sentiment-Analysis',
  },
  {
    slug: 'mlr-cpp',
    title: 'MLR C++',
    client: 'Numerical Systems',
    year: '2024',
    image: mlrRegression,
    summary: 'A fast multiple linear regression library with a Python-facing API and C++ core.',
    url: 'https://github.com/Sidhant-1299/mlr_cpp',
  },
  {
    slug: 'exoplanet-exploration',
    title: 'Exoplanet Exploration EDA',
    client: 'Astronomy Data',
    year: '2024',
    image: jamesWebb,
    summary: 'Exploratory analysis of discovered exoplanets to surface patterns across orbital and physical properties.',
    url: 'https://github.com/Sidhant-1299/Exoplanet-Exploration',
  },
  {
    slug: 'kmeans-visualizer',
    title: 'Interactive K-Means Visualizer',
    client: 'Learning Tool',
    year: '2024',
    image: kmeansVisualizer,
    summary: 'A visual interface for learning how clustering changes as centroids move and assignments update.',
    url: 'https://github.com/Sidhant-1299/Kmeans_interactive_visualizer',
  },
  {
    slug: 'perceptron-study',
    title: 'Perceptron Study',
    client: 'ML Foundations',
    year: '2024',
    image: perceptron,
    summary: 'A compact study of the perceptron learning rule and decision boundary behavior.',
  },
]
