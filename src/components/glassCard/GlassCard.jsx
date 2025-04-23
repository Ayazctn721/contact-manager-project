
import './GlassCard.css'

function GlassCard({children, type}) {
  return (
    <div className={`${type} glass-card col-12 col-md-9 col-lg-5 p-3`}>
      {children}
    </div>
  )
}

export default GlassCard
