export const UtilChessboard = {
    isCorner(length, li, co) {
        let halfLength = length / 2;
        if (li + co < halfLength + 2) return true;
        if (li + co > halfLength * 3) return true;
        if (li < co - halfLength) return true;
        if (li > co + halfLength) return true;
        return false;
    },
    isBoundary(length, li, co) {
        let halfLength = length / 2;
        let result = false;
        if (li + co === halfLength + 2) result = "top-left";
        if (li + co === halfLength * 3) result = "bottom-right";
        if (li === co - halfLength) result = "top-right";
        if (li === co + halfLength) result = "bottom-left";
        if (li === 1 && co === halfLength + 1) result = "angle-top";
        if (li === halfLength && co === halfLength * 2) result = "angle-right";
        if (li === halfLength * 2 && co === halfLength) result = "angle-bottom";
        if (li === halfLength + 1 && co === 1) result = "angle-left";
        return result;
    },
    isInRange(length, li, co) {
        let halfLength = length / 2;
        if (li + co <= halfLength + 2) return false;
        if (li + co >= halfLength * 3) return false;
        if (li <= co - halfLength) return false;
        if (li >= co + halfLength) return false;
        return true;
    },
    isInBuildingRange(li, co, originLi, originCo, width, height, range) {
        let diff = range - 4;
        li -= originLi;
        co -= originCo;
        if (li + co + range + diff < 0) return false;
        if (li + co > range + diff + width + height - 2) return false;
        if (li < co - (range + diff + width - 1)) return false;
        if (li > co + (range + diff + height - 1)) return false;
        return true;
    },
};
