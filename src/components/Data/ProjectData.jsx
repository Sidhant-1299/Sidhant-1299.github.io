import classification_tiktok from "../../assets/Projects/classification_tiktok.png";
import penguins from "../../assets/Projects/penguins.png";
import probability from "../../assets/Projects/probability.png";
import kmeans from "../../assets/Projects/KMeans_Visualizer.jpg";

export const header = "Recent projects";

export const MyProjects = [
  {
    id: 1,
    url: "https://github.com/Sidhant-1299/LinearRegressionWithPenguins",
    img: penguins,
    header: "Linear Regression with Penguins",
    description:
      "Using Linear regression to find relationship between features of Penguins dataset",
  },
  {
    id: 2,
    url: "https://github.com/Sidhant-1299/Classification-with-ML",
    img: classification_tiktok,
    header: "Classification with ML",
    description: "Classifying videos using Random Forest",
  },
  {
    id: 3,
    url: "https://github.com/Sidhant-1299/Kmeans_interactive_visualizer",
    img: kmeans,
    header: "Interactive Kmeans algorithm visualizer",
    description:
      "Using python to make an interactive interface for learning KMeans algorithm",
  },
  {
    id: 4,
    url: "https://github.com/Sidhant-1299/CoinToss",
    img: probability,
    header: "Coin Toss",
    description:
      "Simulating a million coin toss to determine if it has a normal distribution",
  }
];
