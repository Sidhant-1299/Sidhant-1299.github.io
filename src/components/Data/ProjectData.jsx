import classification_tiktok from "../../assets/Projects/classification_tiktok.png";
import jameswebb from "../../assets/Projects/james_webb.jpg";
import kmeans from "../../assets/Projects/KMeans_Visualizer.jpg";
import perceptron from "../../assets/Projects/perceptron.png";
import mlr from "../../assets/Projects/MLR_regression.png";

export const header = "Recent projects";

export const MyProjects = [
  {
    id: 1,
    url: "https://github.com/Sidhant-1299/mlr_cpp",
    img: mlr,
    header: "mlr_cpp",
    description: "Fast C++ Multiple Linear Regression library with Python API",
  },
  {
    id: 2,
    url: "https://github.com/Sidhant-1299/Exoplanet-Exploration",
    img: jameswebb,
    header: "Exoplanet Exploration EDA",
    description:
      "Analyze and understand the properties of discovered exoplanets to uncover patterns",
  },
  {
    id: 3,
    url: "https://github.com/Sidhant-1299/Classification-with-ML",
    img: classification_tiktok,
    header: "Classification with ML",
    description: "Classifying videos using Random Forest",
  },
  {
    id: 4,
    url: "https://github.com/Sidhant-1299/Kmeans_interactive_visualizer",
    img: kmeans,
    header: "Interactive Kmeans algorithm visualizer",
    description:
      "Using python to make an interactive interface for learning KMeans algorithm",
  },
  {
    id: 5,
    url: "https://github.com/Sidhant-1299/Perceptron",
    img: perceptron,
    header: "Perceptron in Python",
    description:
      "A perceptron for binary classification of Iris dataset using a linear decision boundary",
  },
];
