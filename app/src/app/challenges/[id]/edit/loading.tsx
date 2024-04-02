import React from "react"
import ContentLoader from "react-content-loader"

const ChallengeFormSkeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={1500}
    height={600}
    viewBox="0 0 1000 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="200" y="66" rx="0" ry="0" width="400" height="34" /> 
    <rect x="200" y="117" rx="0" ry="0" width="400" height="34" /> 
    <rect x="200" y="169" rx="0" ry="0" width="400" height="34" /> 
    <rect x="200" y="218" rx="0" ry="0" width="400" height="400" /> 
    <rect x="700" y="65" rx="0" ry="0" width="400" height="34" /> 
    <rect x="700" y="119" rx="0" ry="0" width="400" height="90" /> 
    <rect x="700" y="218" rx="0" ry="0" width="400" height="400" /> 
  </ContentLoader>
)


export default ChallengeFormSkeleton