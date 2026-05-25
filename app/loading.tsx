export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 
        style={{ 
          fontFamily: 'Cormorant Garamond, serif', 
          fontWeight: 300, 
          fontSize: 'clamp(2rem, 8vw, 3rem)', 
          color: 'var(--accent-gold)',
          animation: 'fadeIn 1.5s ease-in-out infinite alternate'
        }}
      >
        Solalina
      </h1>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
        `
      }} />
    </div>
  )
}
