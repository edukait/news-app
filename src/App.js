import React from "react";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";
import { getArticles } from "./api";
import { Container, Header, Icon } from "semantic-ui-react";

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: ""
  };

  // function that updates the articles to the list of articles that match the search query
  searchForTopic = async topic => {
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles." });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults
    } = this.state;
    return (
      <Container>
        <Header as="h2" color='blue' icon textAlign='center'>
          <Icon name='newspaper outline' />
          Search a News Topic
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        <p style={{ textAlign: "center" }}>
          Created with <a href="https://newsapi.org/">NewsAPI.org</a>
        </p>
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
      </Container>
    );
  }
}

export default App;
