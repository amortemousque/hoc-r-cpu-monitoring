import { createSelector } from "@reduxjs/toolkit"
import { CpuLoad, CpuLoadTrend, TrendDirection } from "./model/CpuLoad"
import { CpuLoadState } from "./cpuLoadSlice"



export const getCurrentLoad = (state: { cpuLoads: CpuLoadState }): CpuLoad | null => {
    return state.cpuLoads.data.length ? state.cpuLoads.data[state.cpuLoads.data.length - 1] : null
}

export const getCpuLoads = (state: { cpuLoads: CpuLoadState }): CpuLoad[] => state.cpuLoads.data.filter(l => l.recordedAt >= (Date.now() - 600000))

export const getHeavyCpuLoadHistory = (state: { cpuLoads: CpuLoadState }): any[] => state.cpuLoads.heavyCpuLoadHistory

export const getLastTenMinutesCpuLoads = createSelector(getCpuLoads,
    (cpuLoads: CpuLoad[]) => {
        const now = Date.now() - 600000
        return cpuLoads.filter(cpuLoad => cpuLoad.recordedAt >= now)
    })

export const getCpuOverloadPercentage = createSelector(
    getLastTenMinutesCpuLoads,
    (cpuLoads: CpuLoad[]) => {
        return cpuLoads.length ? Math.round(cpuLoads.filter(c => c.value > 1).length * 100 / cpuLoads.length) : 0
    })

export const getCpuLoadTrend = createSelector(
    getLastTenMinutesCpuLoads,
    getCurrentLoad,
    (cpuLoads: CpuLoad[], current: CpuLoad | null): CpuLoadTrend => {
        if (current) {
            const from: CpuLoad = cpuLoads[0]
            const to: CpuLoad = current
            const percentage = from.value > 0 ? Math.round(Math.abs((from.value - to.value) / from.value) * 100) : 0;
            if (from.value < to.value)
                return { direction: TrendDirection.Up, percentage }
            else if (from.value > to.value)
                return { direction: TrendDirection.Down, percentage }
            else
                return { direction: TrendDirection.Flat, percentage }
        }
        return { direction: TrendDirection.Flat, percentage: 0 }
    })

export const underHeavyCpuLoad = createSelector(
    getHeavyCpuLoadHistory,
    (heavyCpuLoads: any[]) => {
        return heavyCpuLoads.length > 0 && !heavyCpuLoads[heavyCpuLoads.length - 1].endedAt ? true : false;
    })
