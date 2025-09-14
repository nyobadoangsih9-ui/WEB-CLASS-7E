// Configuration
const API_BASE_URL = 'https://schoolmate-25.preview.emergentagent.com/api';

// Schedule Data
const scheduleData = [
    {
        day: 'Senin',
        subjects: [
            { time: '07:40-08:20', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '08:20-09:00', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '09:00-09:40', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '10:00-10:40', subject: 'IPS', code: 'IPS' },
            { time: '10:40-11:20', subject: 'IPS', code: 'IPS' },
            { time: '11:20-12:00', subject: 'Matematika', code: 'MTK' },
            { time: '13:00-13:40', subject: 'Pancasila', code: 'PP' },
            { time: '13:40-14:20', subject: 'Matematika', code: 'MTK' },
            { time: '14:20-15:00', subject: 'Matematika', code: 'MTK' },
        ],
    },
    {
        day: 'Selasa',
        subjects: [
            { time: '07:40-08:20', subject: 'PJOK', code: 'PJOK' },
            { time: '08:20-09:00', subject: 'PJOK', code: 'PJOK' },
            { time: '09:00-09:40', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '10:00-10:40', subject: 'Informatika', code: 'Inf' },
            { time: '10:40-11:20', subject: 'Matematika', code: 'MTK' },
            { time: '11:20-12:00', subject: 'Matematika', code: 'MTK' },
            { time: '13:00-13:40', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '13:40-14:20', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '14:20-15:00', subject: 'Bahasa Indonesia', code: 'B.Indo' },
        ],
    },
    {
        day: 'Rabu',
        subjects: [
            { time: '07:40-08:20', subject: 'IPS', code: 'IPS' },
            { time: '08:20-09:00', subject: 'IPS', code: 'IPS' },
            { time: '09:00-09:40', subject: 'Bimbingan Konseling', code: 'BK' },
            { time: '10:00-10:40', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '10:40-11:20', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '11:20-12:00', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '13:00-13:40', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '13:40-14:20', subject: 'Bahasa Indonesia', code: 'B.Indo' },
            { time: '14:20-15:00', subject: 'Bahasa Indonesia', code: 'B.Indo' },
        ],
    },
    {
        day: 'Kamis',
        subjects: [
            { time: '07:55-08:35', subject: 'IPA', code: 'IPA' },
            { time: '08:35-09:15', subject: 'IPA', code: 'IPA' },
            { time: '09:35-10:15', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '10:15-10:55', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '10:55-11:35', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '13:15-13:55', subject: 'Prakarya', code: 'Prky' },
            { time: '13:55-14:35', subject: 'Prakarya', code: 'Prky' },
        ],
    },
    {
        day: 'Jumat',
        subjects: [
            { time: '07:40-08:20', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '08:20-09:00', subject: 'Bahasa Inggris', code: 'B.Ing' },
            { time: '09:20-10:00', subject: 'IPS', code: 'IPS' },
            { time: '10:00-10:40', subject: 'IPS', code: 'IPS' },
            { time: '10:40-11:20', subject: 'Baca Tulis Al-Quran', code: 'BMR' },
        ],
    },
];

// Subject Colors
const subjectColors = {
    'B.Indo': '#FF5722',
    'B.Ing': '#2196F3',
    'MTK': '#4CAF50',
    'IPA': '#9C27B0',
    'IPS': '#FF9800',
    'PJOK': '#F44336',
    'PP': '#3F51B5',
    'Inf': '#00BCD4',
    'BK': '#795548',
    'Prky': '#607D8B',
    'BMR': '#8BC34A',
};

// Global variables
let selectedFile = null;
let photos = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    showWelcomeScreen();
});

// Welcome Screen
function showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainApp = document.getElementById('mainApp');
    
    // Show welcome screen with animation
    welcomeScreen.classList.remove('hidden');
    
    // Hide welcome screen and show main app after 3 seconds
    setTimeout(() => {
        welcomeScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainApp.classList.remove('hidden');
            initializeApp();
        }, 500);
    }, 3000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize main app
function initializeApp() {
    renderSchedule();
    loadPhotos();
    showSchedule();
}

// Navigation functions
function showSchedule() {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-btn[onclick="showSchedule()"]').classList.add('active');
    
    // Update header
    document.getElementById('headerTitle').textContent = 'Jadwal Pelajaran';
    document.getElementById('headerSubtitle').textContent = 'Kelas 7E - Semester Ganjil 2025/2026';
    document.getElementById('headerIcon').className = 'fas fa-calendar';
    
    // Show/hide pages
    document.getElementById('schedulePage').classList.remove('hidden');
    document.getElementById('photosPage').classList.add('hidden');
}

function showPhotos() {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-btn[onclick="showPhotos()"]').classList.add('active');
    
    // Update header
    document.getElementById('headerTitle').textContent = 'Foto Kelas 7E';
    document.getElementById('headerSubtitle').textContent = `${photos.length} foto tersimpan`;
    document.getElementById('headerIcon').className = 'fas fa-images';
    
    // Show/hide pages
    document.getElementById('schedulePage').classList.add('hidden');
    document.getElementById('photosPage').classList.remove('hidden');
    
    // Refresh photos
    loadPhotos();
}

// Schedule functions
function renderSchedule() {
    const container = document.getElementById('scheduleContainer');
    const currentDay = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
    
    container.innerHTML = '';
    
    scheduleData.forEach(daySchedule => {
        const dayCard = document.createElement('div');
        dayCard.className = `day-card ${currentDay === daySchedule.day ? 'current-day' : ''}`;
        
        dayCard.innerHTML = `
            <div class="day-header">
                <h3 class="day-title ${currentDay === daySchedule.day ? 'current' : ''}">
                    ${daySchedule.day}
                </h3>
                ${currentDay === daySchedule.day ? '<i class="fas fa-calendar-day" style="color: #4CAF50;"></i>' : ''}
            </div>
            <div class="subjects">
                ${daySchedule.subjects.map(subject => `
                    <div class="subject-card">
                        <div class="subject-indicator" style="background-color: ${subjectColors[subject.code] || '#757575'};"></div>
                        <div class="subject-content">
                            <div class="subject-time">${subject.time}</div>
                            <div class="subject-name">${subject.subject}</div>
                            <div class="subject-code">${subject.code}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(dayCard);
    });
}

// Photo functions
async function loadPhotos() {
    try {
        const response = await fetch(`${API_BASE_URL}/photos`);
        if (response.ok) {
            photos = await response.json();
            renderPhotos();
        } else {
            console.error('Failed to load photos');
            renderPhotos();
        }
    } catch (error) {
        console.error('Error loading photos:', error);
        renderPhotos();
    }
}

function renderPhotos() {
    const photosGrid = document.getElementById('photosGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (photos.length === 0) {
        photosGrid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    photosGrid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    photosGrid.innerHTML = '';
    
    photos.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.onclick = () => openPhotoModal(photo);
        
        photoCard.innerHTML = `
            <img src="data:image/jpeg;base64,${photo.image_data}" alt="${photo.title}" class="photo-image">
            <div class="photo-info">
                <div class="photo-title">${photo.title}</div>
                <div class="photo-date">${formatDate(photo.uploaded_at)}</div>
            </div>
        `;
        
        photosGrid.appendChild(photoCard);
    });
    
    // Update header subtitle with photo count
    if (document.getElementById('headerTitle').textContent === 'Foto Kelas 7E') {
        document.getElementById('headerSubtitle').textContent = `${photos.length} foto tersimpan`;
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Modal functions
function openPhotoModal(photo) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalUploader = document.getElementById('modalUploader');
    
    modalImage.src = `data:image/jpeg;base64,${photo.image_data}`;
    modalTitle.textContent = photo.title;
    modalDate.textContent = formatDate(photo.uploaded_at);
    modalUploader.textContent = `Diupload oleh: ${photo.uploaded_by}`;
    
    modal.classList.remove('hidden');
}

function closePhotoModal() {
    document.getElementById('photoModal').classList.add('hidden');
}

// Upload functions
function uploadPhoto() {
    document.getElementById('uploadModal').classList.remove('hidden');
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.add('hidden');
    resetUploadForm();
}

function resetUploadForm() {
    document.getElementById('uploadForm').classList.add('hidden');
    document.getElementById('photoInput').value = '';
    document.getElementById('photoTitle').value = '';
    document.getElementById('uploaderName').value = 'Siswa 7E';
    selectedFile = null;
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Mohon pilih file gambar yang valid!');
        return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 5MB.');
        return;
    }
    
    selectedFile = file;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadForm').classList.remove('hidden');
        
        // Auto-generate title
        const title = `Foto Kelas ${new Date().toLocaleDateString('id-ID')}`;
        document.getElementById('photoTitle').value = title;
    };
    reader.readAsDataURL(file);
}

async function submitPhoto() {
    if (!selectedFile) {
        alert('Mohon pilih foto terlebih dahulu!');
        return;
    }
    
    const title = document.getElementById('photoTitle').value || `Foto Kelas ${new Date().toLocaleDateString('id-ID')}`;
    const uploaderName = document.getElementById('uploaderName').value || 'Siswa 7E';
    
    try {
        // Convert file to base64
        const base64 = await fileToBase64(selectedFile);
        
        const photoData = {
            title: title,
            image_data: base64.split(',')[1], // Remove data:image/jpeg;base64, prefix
            uploaded_by: uploaderName
        };
        
        const response = await fetch(`${API_BASE_URL}/photos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData)
        });
        
        if (response.ok) {
            alert('Foto berhasil diupload!');
            closeUploadModal();
            loadPhotos(); // Refresh photos
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('Gagal mengupload foto. Silakan coba lagi.');
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Handle keyboard events
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!document.getElementById('photoModal').classList.contains('hidden')) {
            closePhotoModal();
        }
        if (!document.getElementById('uploadModal').classList.contains('hidden')) {
            closeUploadModal();
        }
    }
});

// Add mobile touch improvements
document.addEventListener('touchstart', function() {}, { passive: true });