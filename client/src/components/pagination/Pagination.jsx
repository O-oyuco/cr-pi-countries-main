export function Paginate(array, currentPage, cardsPerPage) {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return array.slice(indexOfFirstCard, indexOfLastCard);
  }