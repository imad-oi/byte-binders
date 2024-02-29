package com.byteBinders.springbootlibrary.service;

import com.byteBinders.springbootlibrary.dao.BookRepository;
import com.byteBinders.springbootlibrary.dao.CheckoutRepository;
import com.byteBinders.springbootlibrary.dao.HistoryRepository;
import com.byteBinders.springbootlibrary.entity.Book;
import com.byteBinders.springbootlibrary.entity.Checkout;
import com.byteBinders.springbootlibrary.entity.History;
import com.byteBinders.springbootlibrary.responseModels.ShelfCurrentLoansResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class BookService {

    // TODO : change CheckoutRepository CheckoutService...

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    private HistoryRepository historyRepository;


    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
    }


    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("book doesn't exist or already checked out by user ");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(), book.get().getId());

        checkoutRepository.save(checkout);
        return book.get();
    }

    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndAndBookId(userEmail, bookId);

        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }


    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail).size();
    }


    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponse = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findByUserEmail(userEmail);
        List<Long> bookIdList = new ArrayList<>();

        for (Checkout i : checkoutList) {
            bookIdList.add(i.getBookId());
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Book book : books) {
            Optional<Checkout> checkout = checkoutList.stream().filter(x -> x.getBookId() == book.getId()).findFirst();

            if (checkout.isPresent()) {
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit timeUnit = TimeUnit.DAYS;

                long difference_in_time = timeUnit.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponse.add(new ShelfCurrentLoansResponse(book, (int) difference_in_time));
            }
        }

        return shelfCurrentLoansResponse;
    }


    public void returnBook(String userEmail, Long bookId) throws Exception {

        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout == null) {
            throw new Exception("book does not exist or not cheched out by user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);

        bookRepository.save(book.get());
        checkoutRepository.deleteById(validateCheckout.getId());

        History history = new History(userEmail, validateCheckout.getCheckoutDate(), LocalDate.now().toString(), book.get().getTitle(), book.get().getAuthor(), book.get().getDescription(), book.get().getImg());
        historyRepository.save(history);
    }


    public void renewLoan(String userEmail, Long bookId) throws Exception {

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndAndBookId(userEmail, bookId);

        if (validateCheckout == null) {
            throw new Exception("Book does not exist or not checked out by user ");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }
    }

    public void save(Book book) {
        bookRepository.save(book);
    }

}
