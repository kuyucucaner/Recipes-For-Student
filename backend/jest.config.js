module.exports = {
    testEnvironment: 'node', // Node.js ortamında testleri çalıştırır
    testMatch: ['**/tests/**/*.test.js'], // Test dosyalarının yerini belirtir
    collectCoverage: true, // Kod kapsama raporlarını toplar
    coverageDirectory: 'coverage', // Kod kapsama raporlarının kaydedileceği dizin
    coverageReporters: ['text', 'lcov'], // Kapsama raporları için kullanılacak formatlar
  };
  