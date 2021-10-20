const book = {
  data() {
    return {
      books: [],
      bookForm: {}
    }
  },
  computed: {},
  methods: {
    fetchBooksData() {
      fetch("/api/books/")
      .then( response => response.json())
      .then( (responseJson) => {
        console.log(responseJson);
        this.books = responseJson;
      })
      .catch( err => {
        console.error(err)
      })
    },
    postNewBook(evt) {      
      console.log("Posting:", this.bookForm);
      // alert("Posting!");

      fetch('api/books/create.php', {
        method:'POST',
        body: JSON.stringify(this.bookForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;
          
          // reset the form
          this.bookForm = {};
        });
      },
      handleEditOffer(offer) {
        this.selectedOffer = offer;
        this.offerForm = Object.assign({}, this.selectedOffer);
      },
      handleResetEdit() {
        this.selectedOffer = null;
        this.offerForm = {};
    }
  },
  created() {
      this.fetchBooksData();
  }
}
  
Vue.createApp(book).mount('#bookApp');