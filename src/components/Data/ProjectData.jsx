import classification_tiktok from "../../assets/Projects/classification_tiktok.png";
import jameswebb from "../../assets/Projects/james_webb.jpg";
import kmeans from "../../assets/Projects/KMeans_Visualizer.jpg";
import perceptron from "../../assets/Projects/perceptron.png";
import mlr from "../../assets/Projects/MLR_regression.png";
import book_recommender from "../../assets/Projects/semantic_book_recommender_cropped_processed_by_imagy.png";
import yt_analyzer from "../../assets/Projects/youtube_sentiment_analyzer_cropped_processed_by_imagy.png";


export const header = "Recent projects";

export const MyProjects = [
  {
    id: 1,
    url: "https://github.com/Sidhant-1299/Semantic-Book-Recommender",
    img: book_recommender,
    header: "Semantic Book Recommender",
    description: "An interactive dashboard that recommends books based on meaning and mood",
  },
  {
    id: 2,
    url: "https://github.com/Sidhant-1299/Youtube-Sentiment-Analysis",
    img: yt_analyzer,
    header: "Youtube Sentiment Analyzer",
    description: "A Chrome Extensionthat analyzes YouTube comments in real-time",
  },
  {
    id: 3,
    url: "https://github.com/Sidhant-1299/mlr_cpp",
    img: mlr,
    header: "mlr_cpp",
    description: "Fast C++ Multiple Linear Regression library with Python API",
  },
  {
    id: 4,
    url: "https://github.com/Sidhant-1299/Exoplanet-Exploration",
    img: jameswebb,
    header: "Exoplanet Exploration EDA",
    description:
      "Analyze and understand the properties of discovered exoplanets to uncover patterns",
  },
  {
    id: 5,
    url: "https://github.com/Sidhant-1299/Classification-with-ML",
    img: classification_tiktok,
    header: "Classification with ML",
    description: "Classifying videos using Random Forest",
  },
  {
    id: 6,
    url: "https://github.com/Sidhant-1299/Kmeans_interactive_visualizer",
    img: kmeans,
    header: "Interactive Kmeans algorithm visualizer",
    description:
      "Using python to make an interactive interface for learning KMeans algorithm",
  },
  {
    id: 7,
    url: "https://github.com/Sidhant-1299/Perceptron",
    img: perceptron,
    header: "Perceptron in Python",
    description:
      "A perceptron for binary classification of Iris dataset using a linear decision boundary",
  },
];
