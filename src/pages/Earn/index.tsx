import React, { useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink } from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import { RouteComponentProps, NavLink } from 'react-router-dom'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import { JSBI } from '@pangolindex/sdk'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export default function Earn({
  match: {
    params: { version }
  }
}: RouteComponentProps<{ version: string }>) {
  const { chainId } = useActiveWeb3React()
  const [stakingInfoResults, setStakingInfoResults] = useState<any[]>()

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
     flex-direction: column;
   `};
  `

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Pangolin liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Pangolin Liquidity Provider PGL tokens to receive PNG, the Pangolin protocol governance
                  token.
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://pangolin.exchange/litepaper"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about PNG</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
        <DataCard>
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>IMPORTANT UPDATE</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  As a result of Pangolin governance proposal 1, Pangolin is changing staking contracts! After
                  approximately 08:59 UTC on 4/19, all staking rewards will be distributed to the new staking contracts.
                  Before the switch, all rewards will still be distributed to the old contracts. To avoid interruptions
                  to yield farming rewards, you need to unstake your liquidity from the old contracts and restake in the
                  new contracts. You do not need to remove liquidity from your pools or alter your positions.
                </TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  To unstake, go to the old pools, click manage and withdraw your PGL tokens. This will also claim any
                  earned PNG. To restake, navigate to the new pools, click manage, and then deposit.
                </TYPE.white>
              </RowBetween>{' '}
              <NavLink style={{ color: 'white', textDecoration: 'underline' }} to="/png/0" target="_blank">
                <TYPE.white fontSize={14}>Old PNG pools</TYPE.white>
              </NavLink>
              <NavLink style={{ color: 'white', textDecoration: 'underline' }} to="/png/1" target="_blank">
                <TYPE.white fontSize={14}>New PNG pools</TYPE.white>
              </NavLink>
            </AutoColumn>
          </CardSection>
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <TYPE.black fontWeight={400}>The Rewards Never End!</TYPE.black>
        </DataRow>


      </AutoColumn>
    </PageWrapper>
  )
}
