


export function calcRangeCircle(totals) {

    
    const totalAllLent = totals?.totalLent || 0
    const totalAllCollection = totals?.totalCollected || 0

    const radius = 70
    const circumference = 2 * Math.PI * radius

    const collectedPercent =
        totalAllLent > 0
        ? Math.min((totalAllCollection / totalAllLent) * 100, 100)
        : 0


    return{
        totalAllLent,
        totalAllCollection,
        radius,
        circumference,
        lentPercent: 100,
        collectedPercent
    }

}