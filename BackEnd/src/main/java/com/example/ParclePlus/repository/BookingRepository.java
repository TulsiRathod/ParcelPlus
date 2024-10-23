package com.example.ParclePlus.repository;

import com.example.ParclePlus.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // Paginated query to find bookings by user ID
    Page<Booking> findByUser_UserId(int userId, Pageable pageable);

    // Paginated query to find bookings by driver ID
    Page<Booking> findByDriver_DriverId(int driverId, Pageable pageable);

    // Paginated query to find all bookings where the driver is null
    @Query("SELECT b FROM Booking b WHERE b.driver IS NULL")
    Page<Booking> findBookingsWithoutDriver(Pageable pageable);

    // Update booking status
    @Modifying
    @Transactional
    @Query("UPDATE Booking b SET b.status = :status WHERE b.bookingId = :bookingId")
    int updateBookingStatus(int bookingId, String status);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'COMPLETED'")
    long countCompletedBookings();
}
